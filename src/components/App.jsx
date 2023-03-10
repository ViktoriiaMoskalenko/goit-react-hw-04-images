import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Searchbar} from './SearchImages/Searchbar'
import * as API from './API/api'
import { ImageGallery } from './SearchImages/ImageGallery'
import { Modal } from './SearchImages/Modal'
import { Button } from './SearchImages/Button'
import styles from './SearchImages/SearchImages.module.css'


export function App() {
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [btnActive, setBtnActive] = useState(false)
  const [totalPage, setTotalPage] = useState(null)

  const PER_PAGE = 20;

  useEffect(() => {
        if (!value) {
      return
    }
      setLoader(true)
      const dataImg = API.addImages(value, page, PER_PAGE)
      dataImg.then(respData => {
    const totalPageHits = Math.ceil(respData.totalHits / PER_PAGE);
        setTotalPage(totalPageHits)  
      if (page > totalPage) {
            setLoader(false)
            
            return (
              setData(state => state.concat(respData.hits)),
              setBtnActive(false)
              )

          }
      if (page === 1) {
        setLoader(false)
        return setData(state => state)
      }
        setData(state => state.concat(respData.hits))
      
          setLoader(false)
        }).catch(error => console.log(error))
  }, [page, value, totalPage])


  const addImages = async (valueInput) => {
    const dataImg = await API.addImages(valueInput,page, PER_PAGE)
        const totalPageHits = Math.ceil(dataImg.totalHits / PER_PAGE);
    setTotalPage(totalPageHits)
    setData(dataImg.hits)
      setValue(valueInput)
      setPage(1)
        setBtnActive(true)
  }

  const onModal = (largeImageURL) => {
    setLargeImage(largeImageURL)
      setIsActive(true)
      setLoader(false)


  }

  const onClose = () => {
    setIsActive(false)
  }

  const onLoadMore = async () => {
    setPage(state => state + 1)
  }

 return (
   <div align = 'center'>
     <Searchbar onSubmit={addImages} />
     <ImageGallery data={data} onModal={onModal} />
     {isActive && <Modal img={largeImage} onClose={onClose } />}
     {loader &&
       <div className={styles.Loader}>
       <ThreeDots
height="80" 
width="80" 
radius="9"
color="orange" 
       ariaLabel="three-dots-loading"
       wrapperClass='Loader'
       wrapperStyle={{
       }}
visible={true}
 /></div>}
     {btnActive && <Button onLoadMore={onLoadMore} />}
   </div>
  ); 
};

