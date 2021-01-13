import { ref } from 'vue'
import { projectFirestore } from '../../data/firebase/config'

const isPending = ref(false)
const useCollection = (collection) => {
  isPending.value = true
  const error = ref(null)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = ' Error !'
      isPending.value = false
    }
  }

  return { error, addDoc , isPending }

}

export default useCollection