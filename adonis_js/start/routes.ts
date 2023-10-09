
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

const users = [
  { id: 1, name: 'John Doe'},
  { id: 2, name: 'Shukri Ali'},
]

// Get all users
Route.get('/users', async ({ response }) => {
  response.status(200).json(users);
});

// Get specific user by ID
Route.get('/users/:id', async ({ params, response }) => {
  const user = users.find((u) => u.id === parseInt(params.id, 10));

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  response.status(200).json(user);
})

//Create a new user
Route.post('/users', async ({ request, response }) => {

  const { name } = request.all();

  if (!name) {
    return response.status(404).json({ message: 'Name is required' })
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
  }

  users.push(newUser);

  response.status(201).json(newUser);
}); 


//Update a user
Route.put('/users/:id', async ({ params, request, response }) => {
  const userId = Number(params.id)

  //Extract the 'name' field from the request body
  const updatedUser = request.only(['name'])
 
  //Check if the user ID and the update user data are valid
  if (!userId || !updatedUser.name) {
    return response.status(400).json({ error: 'Invalid data provide.'})
  }

  //Find the index of the user with the given ID in the users array
  const userIndex = users.findIndex((user) => user.id === userId )

  //
  if (userIndex === -1){
    return response.status(404).json({ error: 'User not found' })
  }

  //Update the user info
  users[userIndex] = { ...users[userIndex], ...updatedUser }

  return response.status(200).json(users[userIndex])
}); 


//Delete a user
Route.delete('/users/:id', async ({ params, response }) => {

  //
  const id = parseInt(params.id, 10)

  if (isNaN(id)) {
    return response.status(400).json({ error: 'Invalid user ID' })
  }

  const userIndex = users.findIndex((user) => user.id === id )

  if (userIndex === -1 ){
    return response.status(404).json({ error: 'User not found' })
  }

  users.splice(userIndex, 1)
  return response.status(200).json({ message: ' User deleted successfully' })
}); 