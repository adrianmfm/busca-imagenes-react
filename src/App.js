import './header.css'
import './content.css'
import './article.css'
import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik 
        initialValues={{search: ''}}
        onSubmit={async values =>{
          const response = await fetch(
            `https://api.unsplash.com/search/photos?per_page=20&query=
            ${values.search}`, {
              headers: {
                'Authorization': 'Client-ID rf0YLuUIyZxDqCGOn5H76N4quz1nWj-lfHOzYrLznRw'
              }
            })
            const data = await response.json()
          //llama api de unplash
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name="search"
            placeHolder="Busca una imagen"/>
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
           <article key={photo.id}onClick={()=> open(photo.links.html)}>
            <img src={photo.urls.regular}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
           </article> )}
        </div>
      </div>
    </div>
  );
}

export default App;
