/* global db */
db.createUser({
  user: 'bloglist_user',
  pwd: 'bloglist_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'bloglist',
    },
  ],
})