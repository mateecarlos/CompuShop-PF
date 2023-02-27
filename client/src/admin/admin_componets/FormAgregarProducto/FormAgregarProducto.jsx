import React, { useEffect, useState, ChangeEvent } from 'react'
import style from './FormAgregarProducto.module.css'
import { useFormik } from 'formik';
import axios from 'axios';

const categorias = [
  'GPU',
  'CPU',
  'RAM',
  'STORAGE',
  'BOARD',
  'CHASIS',
  'FUENTE',
] 

const FormAgregarProducto = () => {

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
        name: '',
        price: 0,
        category: 'GPU',
        maker: '',
        description: '',
        description_2: '',
        description_3: '',
        description_4: '',
        stock: false,
        quantityStock: 0,
    },
    onSubmit: async (values) => {
      
      if(values.stock === 'true') values.stock = true
      if(values.stock === 'false') values.stock = false

      var data = new FormData();
      data.append('img', file);
      // console.log(file)
      data.append('name', values.name);
      data.append('category', values.category);
      data.append('price', values.price);
      data.append('description', values.description);
      data.append('description_2', values.description_2);
      data.append('description_3', values.description_3);
      data.append('description_4', values.description_4);
      data.append('stock', values.stock);
      data.append('quantityStock', values.quantityStock);
      alert(JSON.stringify(values, null, 2));
      // console.log(data)
      const url= "https://compu-shop-weld.vercel.app/upload/"
      await axios.post(url, data)
      .then(res => console.log(res))
      .catch(error => console.log(error))
      console.log("me ejecute")
      }
    }
      );
//hola saas
  return (
    <div>
        <div className={style.card}>
            <h1>
                Agregar Producto
            </h1>
            <br />
            <p>
                Agregue los productos a la base de datos de CompuShop
            </p>
        </div>
        <div 
          className={style.card}
        >
          <form 
            onSubmit={formik.handleSubmit} 
            className={style.form_container}
          >
              
              <div className={style.form_item}>
                <div>
                  <div>
                    <label htmlFor="">Categoria</label>
                  </div>
                  <div>
                    <select
                        className={style.form_input1}
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                      {
                        categorias.map(categoria => <option value={categoria}>{categoria}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="">Marca</label>
                </div>
                <div>
                  <input 
                      className={style.form_input1}
                    type="text" 
                    id="maker"
                    name="maker"
                    onChange={formik.handleChange}
                    value={formik.values.maker}
                  />
                </div>
                <div>
                  <label htmlFor="">Nombre</label>
                </div>
                <div>
                  <input 
                      className={style.form_input1}
                      type="text" 
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                  />
                </div>
                <div>
                  <label htmlFor="">Precio</label>
                </div>
                <div>
                  <input 
                      className={style.form_input1}
                    type="number" 
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    min={1} 
                  />
                </div>
                <div>
                  <label htmlFor="">Stock</label>
                </div>
                <div>
                  <select 
                      className={style.form_input2}

                      id="stock"
                      name="stock"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stock}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Cantidad</label>
                </div>
                <div>
                  <input 
                      className={style.form_input2}
                      type="number" 
                      id="quantityStock"
                      name="quantityStock"
                      onChange={formik.handleChange}
                      value={formik.values.quantityStock}
                  />
                </div>
              </div>
              <div className={style.form_item}>
                <div>
                  <label htmlFor="">Descripcion #1</label>
                </div>
                <div>
                  <input 
                      className={style.form_input2}
                  
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      type="text" 
                  />
                </div>
                <div>
                  <label htmlFor="">Descripcion #2</label>
                </div>
                <div>
                  <input
                      className={style.form_input2}
                    
                      id="description_2"
                      name="description_2"
                      onChange={formik.handleChange}
                      value={formik.values.description_2}
                      type="text" 
                  />
                </div>
                <div>
                  <label htmlFor="">Descripcion #3</label>
                </div>
                <div>
                  <input 
                      className={style.form_input2}
                  
                      id="description_3"
                      name="description_3"
                      onChange={formik.handleChange}
                      value={formik.values.description_3}
                      type="text" 
                  />
                </div>
              
               
              <div>
                <label htmlFor="">Descripcion #4</label>
              </div>
              <div>
                <input 
                    className={style.form_input2}
                 
                    id="description_4"
                    name="description_4"
                    onChange={formik.handleChange}
                    value={formik.values.description_4}
                    type="text" 
                />
              </div>
              <div>
                <label htmlFor="">Imagen</label>
              </div>
              <div>
                <input 
                    className={style.form_input2}
                    type="file" onChange={handleFileChange} />
              </div>
              <div>
                <input type="submit" placeholder='Agregar' className={style.form_button}/>
              </div>
              </div>
          </form>
        </div>
    </div>
  )
}

export default FormAgregarProducto
