import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"


export default function Category() {

  const [ listings, setListings ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        // categoryName comes from route in App.js (rent/sell)
        const q = query(
          listingsRef, 
          where('type','==', params.categoryName), 
          orderBy('timestamp', 'desc'), 
          limit(10)
        )

        // Execute query, gets a snapshot
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)

        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)

      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [params.categoryName])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef, 
        where('type','==', params.categoryName), 
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query, gets a snapshot
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length-1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)

    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }


  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places for Rent' : 'Places for Sale'}
        </p>
      </header>
      {
        loading ? <Spinner /> : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p onClick={onFetchMoreListings} className="loadMore">Load More</p>
          )}
        </>
        ) : (
          <p>No listings for {params.categoryName}</p>
        )
      }
    </div>
  )
}