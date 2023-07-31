interface Game_Model {
    id: number | any,
    gameNo: string | any,
    result: string | any,
    meron_total_bet: string | any,
    wala_total_bet: string | any,
    total_bet: string | any,
    pasada: string | any,
    meron_probability: string | any,
    wala_probability: string | any,
    meron_odds: string | any,
    wala_odds: string | any,
    declaratorId: string | any,
}
const initialGameValue: Game_Model = {
    id: 0,
    gameNo: '',
    result: '',
    meron_total_bet: '',
    wala_total_bet: '',
    total_bet: '',
    pasada: '',
    meron_probability: '',
    wala_probability: '',
    meron_odds: '',
    wala_odds: '',
    declaratorId: '',
}
export default Game_Model
export {
    initialGameValue
}