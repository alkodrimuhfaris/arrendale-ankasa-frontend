import http from '../../Helper/http'
import qs from 'querystring'

export default {
    addData: (data) => ({
        type: ' ADD_FLIGHT',
        payload: http().post('flight/',qs.stringify(data))
    })
}