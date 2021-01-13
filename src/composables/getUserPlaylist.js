import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../../data/firebase/config'
import getUser from '../composables/getUser'
const getCollection = (collection) => {

  const documents = ref(null)
  const error = ref(null)
    const {user} = getUser()
    console.log(`userID==${user.value.uid}`)
    const query = ['userID','==',user.value.uid]
    // register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection)
      .orderBy('createdAt').where(...query)
    const unsub = collectionRef.onSnapshot(snap => {
      let results = []
      snap.docs.forEach(doc => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({...doc.data(), id: doc.id})
      });
    
    // update values
    documents.value = results
    error.value = null
  }, err => {
    console.log(err.message)
    documents.value = null
    error.value = 'could not fetch the data'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents }
}

export default getCollection