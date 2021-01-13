import { ref } from 'vue'
import { projectFirestore } from '../../data/firebase/config'

const useCollection = (collection) => {

  const error = ref(null)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null

    try {
      await projectFirestore.collection(collection).add(doc)
    }
    catch(err) {
      console.log(err.message)
      error.value = ' Error !'
    }
  }

  return { error, addDoc }

}

export default useCollection