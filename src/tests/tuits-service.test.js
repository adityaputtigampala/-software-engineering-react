import { PassThrough } from "stream";
import {
  createTuit, deleteTuit, findTuitById, findAllTuits
} from "../services/tuits-service";

import {
  deleteUsersByUsername, createUser
} from "../services/users-service"; 
const user = {
  username: 'bigal',
  password: 'alice456',
  email: 'bigal123@gmail.com'
}
describe('can create tuit with REST API', () => {
  // TODO: implement this
  const tuitPosted = {
    _id: '944c12333llhhh13213',
    tuit: 'Aloh, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/01/2022'
  }

  beforeAll(async ()=> {
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });
  
  afterAll( ()=>{
    deleteTuit(tuitPosted._id);
    return deleteUsersByUsername(user.username);
  })

  test('can insert new tuits with REST API', async ()=> {
    const userCreated = await createUser(user);
    const tuitCreated = await createTuit(userCreated._id, tuitPosted);
    expect(tuitCreated.tuit).toEqual(tuitPosted.tuit);
  })
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
  const tuitPosted = {
    _id: '944c12333llhhh13213',
    tuit: 'Aloh, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/01/2022'
  }

  beforeAll(async ()=> {
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });
  
  afterAll(async ()=>{
    await deleteTuit(tuitPosted._id);
    return deleteUsersByUsername(user.username);
  })

  test('can delete new tuits with REST API', async ()=> {
    const userCreated = await createUser(user);
    await createTuit(userCreated._id, tuitPosted);
    const status = await deleteTuit(tuitPosted._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this

  const tuitPosted = {
    _id: '944c12333llhhh13213',
    tuit: 'Aloh, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/01/2022'
  }

  beforeAll(async ()=> {
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });
  
  afterAll(async ()=>{
    await deleteTuit(tuitPosted._id);
    return deleteUsersByUsername(user.username);
  })

  test('can retrieve tuit by id REST API', async ()=> {
    const userCreated = await createUser(user);
    await createTuit(userCreated._id, tuitPosted);
    const retrievedTuit = await findTuitById(tuitPosted._id);
    expect(retrievedTuit.tuit).toEqual(tuitPosted.tuit);
    expect(retrievedTuit.postedBy).toEqual(userCreated);
  })
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this

  const tuitPosted = [
    {
    _id: '944c12333llhhh13213',
    tuit: 'Aloha, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/01/2022'
  },
  {
    _id: '944c12333llhhh13214',
    tuit: 'Aloha, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/02/2022'
  },
  {
    _id: '944c12333llhhh13214',
    tuit: 'Aloha, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/03/2022'
  },
  {
    _id: '944c12333llhhh13216',
    tuit: 'Aloha, big al in the hizzy spinning up some tuitsss',
    postedOn: '12/04/2022'
  }
]

  beforeAll(async ()=> {
    Promise.all(tuitPosted.map(async(tuit)=>await deleteTuit(tuit._id)));
    return deleteUsersByUsername(user.username);
  });
  
  afterAll(async ()=>{
    Promise.all(tuitPosted.map(async(tuit)=>await deleteTuit(tuit._id)));
    return deleteUsersByUsername(user.username);
  })

  test('can retrieve all tuits with REST API', async ()=> {
    const userCreated = await createUser(user);
    await Promise.all(tuitPosted.map(async(tuit)=> {
      return await createTuit(userCreated._id, tuit);
    }));
    const retrievedTuits = await findAllTuits();
    expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuitPosted.length);
  })
});