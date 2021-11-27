export default function(context){

    return {
        httpEndpoint: 'http://localhost:8080/v1/graphql',
        httpLinkOptions: {
          credentials: 'include',
          headers: {
            'authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token') }` : '' 
          }
        }
        
    }
    
} 