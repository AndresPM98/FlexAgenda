import { useEffect, useContext } from 'react'
import { TurnoContext, UserContext } from '@context/context'

export default function MPButton() {
const { turno } = useContext(TurnoContext)
const { user } = useContext(UserContext)

useEffect(() => {
const fetchCheckout = async () => {
const res = await fetch('/api/checkout', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
user,
turno
}),
})
const data = await res.json()
if(data.global) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.setAttribute('data-preference-id', data.global)
    document.body.appendChild(script)

    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR'
    })

    mp.checkout({
      preference: {
        id: data.global
      },
      render: {
        container: '.cho-container',
        label: 'Pagar',
      }
    });
  }
}

fetchCheckout()
}, [])

return <div className="cho-container"></div>
}