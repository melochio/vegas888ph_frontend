interface Stream_Model {
    id: number | any,
    gameTitle: string| any,
    streamID: string| any,
    title: string| any,
    src: string| any,
    passphrase: string| any,
    viewState: string| any,
    expfights: string| any,
}
const initialStreamValue: Stream_Model = {
    id: 0,
    gameTitle: '',
    streamID: '',
    title: '',
    src: '',
    passphrase: '',
    viewState: '',
    expfights: '',
}
export default Stream_Model

export {
    initialStreamValue
}