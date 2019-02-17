import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux';
import { HOST } from '../config/constants';

export default Reactotron
   .configure({ host: HOST }) // controls connection & communication settings
   .useReactNative() // add all built-in react native plugins
   .use(reactotronRedux())
   .connect() // let's connect!