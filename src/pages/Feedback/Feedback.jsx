import React, { useEffect, useState } from "react";
import styles from './Feedback.module.scss';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLenghtError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [inputValid, setInputValid] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLenght': 
          value.length < validations[validation] ? setMinLenghtError(true) : setMinLenghtError(false)
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;
        case 'isEmail':
          const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
          re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
          break;
        default:
          break;
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || minLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, minLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    emailError,
    inputValid
  }
}

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

function Feedback () {
  const email = useInput('', {isEmpty: true, minLenght: 5, isEmail: false})
  const name = useInput('', {isEmpty: true, minLenght: 3})
  const message = useInput('', {isEmpty: true, minLenght: 10})
  const emailValue = email.value
  const nameValue = name.value
  const messageValue = message.value
  const objValue = {emailValue, nameValue, messageValue}

  return (
    <div className={styles.content}>
      <div className={styles.contentHeadingBlock}>
        <h1>???????????????? ??????????</h1>
      </div>
      <form>
        {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>???????? ???? ?????????? ???????? ????????????</div>}
        {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>???????????????????????? ??????????</div>}
        {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>???????????????????????? ????????????</div>}
        <label htmlFor="email"><span>*</span>??????????</label>
        <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} id="email" name="email" type="text" placeholder="?????????????? ??????????" />
        {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>???????? ???? ?????????? ???????? ????????????</div>}
        {(name.isDirty && name.minLengthError) && <div style={{color: 'red'}}>???????????????????????? ??????????</div>}
        <label htmlFor="name"><span>*</span>??????</label>
        <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} value={name.value} id="name" name="name" type="text" placeholder="?????????????? ??????" />
        <div className={styles.radioCheckbox}>
          <h5>?????? ??????</h5>
          <input className={styles.customRadio} name="gender" type="radio" id="genderMale" value="male" />
          <label htmlFor="genderMale">??????????????</label>
          <input className={styles.customRadio} name="gender" type="radio" id="genderFemale" value="female" />
          <label htmlFor="genderFemale">??????????????</label>
        </div>
        {(message.isDirty && message.isEmpty) && <div style={{color: 'red'}}>???????? ???? ?????????? ???????? ????????????</div>}
        {(message.isDirty && message.minLengthError) && <div style={{color: 'red'}}>???????????????????????? ??????????</div>}
        <label htmlFor="message"><span>*</span>??????????????????</label>
        <input onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} value={message.value} id="message" name="message" type="text" placeholder="?????????????? ??????????????????" />
        <div className={styles.inputFile}>
          <input type="file" name="file" id="inputFile" className={styles.customInputFile} />
          <label htmlFor="inputFile"> ?????????????????? ?????? </label>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.customCheckbox} id="subscription" name="subscription" value="yes" />
          <label htmlFor="subscription">?????????????????????? ???? ???????????????????? ???????????????????????? ????????????????</label>
        </div>
        <button disabled={!email.inputValid || !name.inputValid || !message.inputValid} className={styles.greenButton} type="submit" >??????????????????</button>
        <button className={styles.greenButton} type="button" onClick={() => (console.log(objValue))}>?????????????????? ?? ??????????????</button>
        <img src="img/form-img.png" alt="Form" />
      </form>
    </div>
  );
}

export default Feedback;