'use client'

import { useEffect, useState } from "react";

export default function () {
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  })
  if (client) {
    const exists = window.localStorage.getItem('clean_art_cart')
    if (!exists) window.localStorage.setItem('clean_art_cart', JSON.stringify([]))
  }
}

