import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  {username: 'alice123', password: 'alice456', email: 'alice123@gmail.com', _id: '00123'},
  {username: 'bob123', password: 'bob456', email: 'bob123@gmail.com', _id: '00124'},
  {username: 'charlie123', password: 'charlie456', email: 'charlie123@gmail.com', _id: '00125'}
];

const MOCKED_TUITS = [
  {
    _id: '00123',
    postedBy: MOCKED_USERS[0],
    tuit: "alice's tuit"
  },
  {
    _id: '00124',
    postedBy: MOCKED_USERS[1],
    tuit: "bob's tuit"
  },
  {
    _id: '00125',
    postedBy: MOCKED_USERS[2],
    tuit: "charlie's tuit"
  }
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
      </HashRouter>
  );
  const linkElement = screen.getByText(/Aloha, big al in the hizzy spinning up some tuitsss/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(()=>
    Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
      <HashRouter>
        <Tuits tuits = {tuits}/>
        </HashRouter>
        );
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
    mock.mockRestore();
});
