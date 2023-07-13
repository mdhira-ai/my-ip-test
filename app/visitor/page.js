'use client'

import { useEffect, useState } from "react";


export default function page() {

    const [data, setdata] = useState(null)

    useEffect(() => {

        
        async function getData() {
            // The return value is *not* serialized
            const res = await fetch('api/scrape/');
            // You can return Date, Map, Set, etc.
            return res.json();
        }

        getData().then((res) => {  
            setdata(res)
        }
        );

    },[])



    return (
      <div style={{ width: '100vw', height: '100vh', padding: 30 }}>
        <h1>
          IP Address <span style={{ }}>{data?.body.message}</span>
        </h1>
      </div>
    );
  }
  
