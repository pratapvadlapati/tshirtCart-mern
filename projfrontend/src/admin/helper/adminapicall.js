import {API} from '../../../src/backend';


//Create Category
  export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


//Update category
    export const updateCategory = (userId,categoryId,token, category) => {
        return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

//Delete category
    export const deleteCategory = (userId,categoryId,token,category) => {
        return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }
    

    //Create Product
    export const CreateProduct = (userId, token, product) => {

            return fetch(`${API}/product/create/${userId}`, {
                method: "POST",
                //mode: "no-cors",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: product
            }).then(response  => {
                return response.json()
            })
            .catch(err => console.log(err))
    }


    //Update Product
    export const UpdateProduct = (productId,userId, token, product) => {
        return fetch(`${API}/product/${productId}/${userId}`, {
            method: "PUT",
            headers:{
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        }) .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }


    //Delete Product
    export const deleteProduct = (userId, productId,token, product) => {
        return fetch(`${API}/product/${productId}/${userId}`, {
            method: "DELETE",
            headers:{
                Accept: "application/json",
                //"Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        }) .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    //get prodcut by id
    export const getProduct = (productId) => {
        return fetch(`${API}/product/${productId}`,{
            method: "GET"
        }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
    }


    //Get all Product
    export const getProducts = () => {
        return fetch(`${API}/product/list/allproducts`, {
            method: "GET"
        }) .then(response  => {
            return response.json()  
        }).catch(err => console.log(err))
        
    }


    //Get distinct categories
    export const getCategories = () => {
        return fetch(`${API}/category/all`,{
            method: "GET"
        }) .then(response => {
            return response.json()
        }).catch(err => console.log(err))
    }