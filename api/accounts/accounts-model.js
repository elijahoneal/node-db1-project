const { del } = require('../../data/db-config')
const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id}).first()
}

async const create = account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

async const updateById = (id, account) => {
  // DO YOUR MAGIC
await db('accounts').where({id}).update(account)
return getById(id)
}

async const deleteById = id => {
  // DO YOUR MAGIC
  const deleted = await getById(id)

  await db('accounts').where('id',id).delete();
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
