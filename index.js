const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())




const order = []

const checkOrderId =(request, response, next) => {
    
    const { id } = request.params

    const index = order.findIndex(requests => requests.id === id) //pode usar qualquer nome

    if (index < 0){
        return response.status(404).json({message:"user not found"})
    }
    request.orderIndex = index
    request.orderId = id

    

    next()

}

const checkOpeningWindow = (request, response, next) =>{
    console.log(request.method)
    console.log(request.url)


next()
}


app.get('/order',checkOpeningWindow, (request, response) => {

    return response.json(order)
})

app.post('/order', checkOpeningWindow,(request, response) => {

    const { orders, clienteName, price, status } = request.body
    //console.log( uuid.v4())
    const requests = { id: uuid.v4(), orders:orders, clienteName:clienteName, price:price, status:status }

    order.push(requests)

    return response.status(201).json(requests)
    //return response.json(order)
})

app.put('/order/:id', checkOrderId ,checkOpeningWindow, (request,response) =>{
    
    //const { id } = request.params
    const { orders, clienteName, price, status} = request.body
    const index = request.orderIndex
    const id = request.orderId

    const updateOrder ={ id, orders, clienteName, price, status}

   /* const index = order.findIndex(requests => requests.id === id) //pode usar qualquer nome

    if (index < 0){
        return response.status(404).json({message:"user not found"})
    }*/

    order[index] = updateOrder

    return response.status(201).json(updateOrder)

})



app.get('/order/:id',checkOrderId ,checkOpeningWindow, (request, response)=> {
    const { orders, clienteName, price, status} = request.body
    const index = request.orderIndex
    const id = request.orderId


    const updateOrder ={ id, orders:order[index].orders, clienteName:order[index].clienteName, price:order[index].price, status:order[index].status}

    order[index] = updateOrder


 return response.status(201).json(updateOrder)

})


app.patch('/order/:id',checkOrderId  ,checkOpeningWindow, (request, response)=>{
    const { orders, clienteName, price, status} = request.body
    const index = request.orderIndex
    const id = request.orderId

    //const updateStatus ={id, orders:[index].orders , clienteName:[index].clienteName, price:[index].price, status:"Pronto"}
    const updateStatus = { id ,orders:order[index].orders, clienteName:order[index].clienteName, price:order[index].price, status:"pronto"}
    
    order[index] = updateStatus
   // console.log("qual problema")


  
    return response.status(201).json(updateStatus)
} )


app.delete('/order/:id', checkOrderId  ,checkOpeningWindow, (request, response)=> {
   
    const index = request.orderIndex

    order.slice(index,1)

    return response.status(204).json()
})




app.listen(port, () => {
    console.log(`🚀serve started on port ${port}`)
})