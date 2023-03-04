import styles from "./Add.module.css";

const AddButton = ({ setProduct }) => {
  return (
    <div onClick={() => setProduct(false)} className={styles.mainAddButton}>
      Add New Product
    </div>
  );
};

export default AddButton;