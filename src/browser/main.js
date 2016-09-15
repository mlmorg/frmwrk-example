import getState from 'safe-json-globals/get';
import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';

const initialState = getState('initialState');

InfernoDOM.render(<h1>Hello World!</h1>, document.getElementById('app'));
