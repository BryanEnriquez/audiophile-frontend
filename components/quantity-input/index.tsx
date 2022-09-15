import styles from './input.module.scss';

type QuantityInputBase = {
  value: number;
  onDec: () => void;
  onInc: () => void;
};

type QuantityInputWithSelect = QuantityInputBase & {
  type: 'select';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type QuantityInputWithoutSelect = QuantityInputBase & {
  type: 'reg';
  onChange?: undefined;
};

type QuantityInputProps = QuantityInputWithSelect | QuantityInputWithoutSelect;

const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const QuantityInput = ({
  type,
  value,
  onDec,
  onInc,
  onChange,
}: QuantityInputProps) => (
  <div className={`${styles.count} ${styles[`count--${type}`]}`}>
    <button type="button" onClick={onDec}>
      -
    </button>
    {type === 'select' ? (
      <div className={styles.count__input}>
        <label htmlFor="quantity">Quantity</label>
        <select
          className={styles.count__num}
          value={value}
          name="quantity"
          id="quantity"
          onChange={onChange}
        >
          {selectOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <span className={styles.count__num}>{value}</span>
    )}
    <button type="button" onClick={onInc}>
      +
    </button>
  </div>
);

export default QuantityInput;
