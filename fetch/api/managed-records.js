import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
const retrieve = function( options = {} ){

  const page = options.page || 1
  const offset = ( page - 1 ) * 10
  const colors = options.colors || ''
  const url =  URI( path )
    .search({ limit: '11', offset: offset, 'color[]': [ ...colors ] })
  const headers =  {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  }

  return fetch( url, headers )
   .then( res => res.json() )
   .then( data => {
     return composeResponse( data, page )
   })
   .catch( error => console.log( error ) )
}

function composeResponse( data, page ) {
  const previousPage = page === 1 ? null : page - 1
  const nextPage = data.length === 11 ? page + 1 : null
  const open = OpenWithPrimary( data )
  var ids, closedPrimaryCount
  [ ids, closedPrimaryCount ] = updateIdsAndCPC( data )

  return { previousPage: previousPage, nextPage: nextPage,  ids: ids, open: open, closedPrimaryCount: closedPrimaryCount }
}

function OpenWithPrimary( data ) {
  var openDisposition = data.filter(( value, index ) => value.disposition === 'open' && index < 10 )
  var withPrimary = openDisposition.map( value => {
    var oWithP = Object.assign( {}, value )
    oWithP.isPrimary = primary( value.color )
    return oWithP
  })
  return withPrimary
}

function updateIdsAndCPC( data ) {
  var ids = []
  var closedPrimaryCount = 0
  data.filter(( val, index ) => index < 10).forEach(( value, index ) => {
      ids.push( value.id )
      if ( value.disposition === 'closed' && primary( value.color )) {
        closedPrimaryCount += 1
      }
  })
  return [ ids, closedPrimaryCount ]
}

const primary = color => [ 'red', 'blue', 'yellow' ].includes( color )

export default retrieve;
