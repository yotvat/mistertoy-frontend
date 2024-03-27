

export function ToySort({ onSetSort, sortBy }) {
  function handleChange({ target }) {
    let { type, value } = target
    if (type === 'select-one') {
      const currDir = Object.values(sortBy)[0]
      onSetSort({ [value]: currDir || 1 })
    }

    if (type === 'checkbox') {
      const currSort = Object.keys(sortBy)[0]
      const dir = sortBy[currSort] === 1 ? -1 : 1
      onSetSort({ [currSort]: dir })
    }
  }

  return (
    <section className="contact-sort">
      <h1>Sort by</h1>
      <select name="select-sort" id="select-sort" onChange={handleChange}>
        <option value="name">Name</option>
        <option value="price">price</option>
        <option value="created">Time of creation</option>
      </select>

      <label htmlFor="sort-dir">Descending</label>
      <input
        type="checkbox"
        name="sort-dir"
        id="sort-dir"
        onChange={handleChange}
      />
    </section>
  )
}