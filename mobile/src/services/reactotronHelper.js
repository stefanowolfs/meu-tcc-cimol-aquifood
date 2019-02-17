import Reactotron from 'reactotron-react-native'

export function
    log(...args) {
    console.log(...args);
    Reactotron.display({
        name: 'TRON',
        value: args,
        preview: args.length > 1 ? JSON.stringify(args) : args[0],
    });
}
