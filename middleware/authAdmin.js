export default function({store, redirect}){
  if(!store.getters['auth/authitencatedAdmin']){
    return redirect('/')
  }
}
