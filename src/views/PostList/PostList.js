import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PostsToolbar, PostsTable } from './components';
import API from '../../services'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PostList = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("")
  const [selectedPosts, setSelectedPosts] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [maxSize, setMax] = useState(0)
  const [posts, setPosts] = useState([])
  const [isPending, setPending] = useState(false)

  const selectionProp = [selectedPosts, setSelectedPosts]
  const pageProp = [page, setPage]
  const maxProp = [maxSize, setMax]
  const rowsProp = [rowsPerPage, setRowsPerPage]

  useEffect(() => {

    fetchData()

  },[rowsPerPage, page, search, isPending])

  const fetchData = async() => {

    let query = search ? `title=$reg=${search}.*` : undefined

    if (isPending) {
      let q = "status=pending"
      if (query) query += `&`
      else query = ""
      query += q
    }
    
    let res = await API.getPost(page + 1, rowsPerPage, query)

    let data = res.data
    
    setMax(data.total)
    let posts = data.items.map((post) => {

      return {
        id: post._id,
        title: post.title || "-",
        type: post.product ? post.product.residential_type: "Removed",
        status : post.status
      }

    })

    setPosts(posts)

  }

  const onSearch = ({target:{value}}) => {

    setSearch(value)

  }

  const onApprove = async () => {

    await Promise.all(selectedPosts.map((postId) => API.acceptPost(postId)))
    await fetchData()

  }

  const onDelete = async() => {

    await Promise.all(selectedPosts.map((postId) => API.deletePost(postId)))
    await fetchData()

  }

  const onPending = () => {
    setPending(!isPending)
  }

  return (
    <div className={classes.root}>
      <PostsToolbar onSearch={onSearch} onApprove={onApprove} onDelete={onDelete} onPendingOnly={onPending} pendingOnly={isPending} />
      <div className={classes.content}>
        <PostsTable
          selectionUser={selectionProp}
          users={posts}
          pageProp={pageProp}
          maxProp={maxProp}
          rowsProp={rowsProp}
        />
      </div>
    </div>
  );
};

export default PostList;
