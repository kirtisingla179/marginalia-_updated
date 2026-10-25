// One labelled form field with an inline error message.
export default function Field({ id, label, error, as: Tag = 'input', wrapClass = 'auth__field', hint, ...props }) {
  return (
    <div className={wrapClass}>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} className={error ? 'input-invalid' : undefined} aria-invalid={!!error} {...props} />
      {hint && <p className="editor__hint">{hint}</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  )
}
