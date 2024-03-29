import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
   setValues,
  values,
  // handleCatagoryChange,
  // subOptions,
  // showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    source,
    destination,
    day1,
    day2,
    id,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name of train</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>TrainId</label>
        <input
          type="text"
          name="id"
          className="form-control"
          value={id}
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div> */}

      <div className="form-group">
        <label>Cost per unit</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
{/* 
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div> */}

      <div className="form-group">
        <label>Slots</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Type of train</label>
        <input
          type="text"
          name="category"
          className="form-control"
          value={category}
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div> */}

<div className="form-group">
        <label>Source</label>
        <input
          type="text"
          name="source"
          className="form-control"
          value={source}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Desination</label>
        <input
          type="text"
          name="destination"
          className="form-control"
          value={destination}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Day of departure</label>
        <input
          type="text"
          name="day1"
          className="form-control"
          value={day1}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Day of Arrival at Destination</label>
        <input
          type="text"
          name="day2"
          className="form-control"
          value={day2}
          onChange={handleChange}
        />
      </div>

      {/* {showSub && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )} */}

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
