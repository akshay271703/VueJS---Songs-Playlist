import { ref } from 'vue'
import { projectFirestore } from '../../data/firebase/config'

const useDocument = (collection, id)=>{
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async()=>{
        isPending.value = true
        error.value = null
        try{
            const res = docRef.delete()
            isPending.valuefalse
            return res
        }catch(err){

            error.value = 'Could not delete the Playlist'
            console.log(err.message)
            isPending.value = false
        }
    }

    const updateDoc = async(updates)=>{
        isPending.value = true
        error.value = null
        try{
            const res = docRef.update(updates)
            isPending.valuefalse
            return res
        }catch(err){

            error.value = 'Could not Update the Playlist'
            console.log(err.message)
            isPending.value = false
        }
    }

    return { error , isPending , deleteDoc, updateDoc }
}


export default useDocument