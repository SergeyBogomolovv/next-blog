import { Suggestion } from '@prisma/client'
import React from 'react'

interface Props {
  showAdminFeatures?: boolean
  suggestion: Suggestion
  date: Date
}

export default function Suggestion({
  showAdminFeatures,
  suggestion,
  date,
}: Props) {
  const postDate = date.toLocaleDateString()
  return <div></div>
}
