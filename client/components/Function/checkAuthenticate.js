import {_helper} from './API';

export default () => {
    return _helper.fetchGET(
        '/session',
        []
    )
    .then((response) => {
        if (response) {
            const { data, status } = response;
            if (status == 200) {
                return {authentication: true, data};
            }
            else {
                return false;
            }
        }
    })
}

