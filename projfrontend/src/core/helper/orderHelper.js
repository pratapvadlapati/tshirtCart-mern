import { API } from "../../backend";




//create order in the backend 
export const createOrder = (userId, token, order) => {

return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
        body: JSON.stringify({order: order.order.data})
}).then(response => {
    return response.json()
}).catch(err => console.log(err));

} 


