import request from './request'

export const getUsers = (params) => {
  return request({
    url: '/users',
    params
  })
}

export const changeMgStatus = (data, type) => {
  return request({
    url: `users/${data}/state/${type}`,
    method: 'put'
  })
}

export const addUser = (data) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
