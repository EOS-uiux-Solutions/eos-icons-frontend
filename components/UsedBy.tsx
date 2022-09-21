import React from 'react'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

export const UsedBy = () => {
  return (
    <div className='used-by'>
      <span>Handmade to fit top open source players</span>
      <ul>
        {data.map((ele, i) => {
          return (
            <li key={uuid()}>
              <a
                href={ele.url}
                className='used-by-image'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image src={ele.image} alt={ele.name} />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const data = [
  {
    name: 'kubernetes',
    url: 'https://kubernetes.io/',
    image: require('../public/assets/images/logos/kubernetes.svg')
  },
  {
    name: 'suse',
    url: 'https://www.suse.com/',
    image: require('../public/assets/images/logos/suse.svg')
  },
  {
    name: 'uyuni',
    url: 'https://www.uyuni-project.org/',
    image: require('../public/assets/images/logos/uyuni.svg')
  },
  {
    name: 'openSUSE',
    url: 'https://www.opensuse.org/',
    image: require('../public/assets/images/logos/opensuse.svg')
  },
  {
    name: 'Open Build Service',
    url: 'https://openbuildservice.org/',
    image: require('../public/assets/images/logos/obs.svg')
  },
  {
    name: 'Stratos',
    url: 'https://stratos.app/',
    image: require('../public/assets/images/logos/stratos.png')
  }
]
