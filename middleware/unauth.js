export default function ({store, redirect}) {
  if(store.getters['auth/authitencated']){
    return redirect('/homeUser')
  }else if(store.getters['auth/authitencatedAdmin']){
    return redirect('/homeAdmin')
  }
}
