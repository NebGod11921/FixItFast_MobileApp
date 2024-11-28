import { SafeAreaView } from 'react-native'
import React from 'react'
import { CS } from '@/src/styles/cs.style'
import DiscountScreen from '@/src/screens/discount/DiscountScreen'

const discountRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <DiscountScreen />
    </SafeAreaView>
  )
}

export default discountRoute