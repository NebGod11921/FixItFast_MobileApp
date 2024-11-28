import React from 'react'
import { SafeAreaView } from 'react-native'
import { CS } from '@/src/styles/cs.style'
import CreateNewPassword from '@/src/screens/auth/forgot-password/CreateNewPassword'

const createNewPasswordRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
        <CreateNewPassword />
    </SafeAreaView>
  )
}

export default createNewPasswordRoute