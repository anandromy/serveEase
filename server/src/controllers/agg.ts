// [
//   {
//     '$unwind': '$orders'
//   }, {
//     '$group': {
//       '_id': '$_id', 
//       'name': {
//         '$first': '$name'
//       }, 
//       'totalQuantity': {
//         '$sum': '$orders.quantity'
//       }, 
//       'totalSales': {
//         '$sum': {
//           '$multiply': [
//             '$orders.quantity', '$price'
//           ]
//         }
//       }
//     }
//   }
// ]


// DATE RANGE
[
  {
    '$unwind': '$orders'
  }, {
    '$match': {
      'orders.orderedAt': {
        '$gte': '2023-05-31T18:30:00.000Z', 
        '$lt': '2024-05-31T18:30:00.000Z'
      }
    }
  }, {
    '$group': {
      '_id': '$name', 
      'totalQuantity': {
        '$sum': '$orders.quantity'
      }, 
      'totalSalesAmount': {
        '$sum': {
          '$multiply': [
            '$orders.quantity', '$price'
          ]
        }
      }
    }
  }
]