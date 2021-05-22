const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload , checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')


router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then( allAccounts => res.status(200).json(allAccounts) )
    .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
})

router.get('/:id', checkAccountId,  (req, res, next) => {
  // DO YOUR MAGIC
    res.json(req.account)
 
  
  
  
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then(newAccount => res.status(201).json(newAccount))
    .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id , req.body)
  .then( () => {
    return Accounts.getById(req.params.id)
  } )
    .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(account => res.status(200).json(account))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // DO YOUR MAGIC
//   res.status( err.status || 500 ).json({message: 'Something went wrong'})
// })

module.exports = router;
