import { FormGroup } from "@angular/forms";
export const EmailValidation="[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
export const characterwithspacesonly = "^[a-zA-Z_ ]*$";
export const isEmailValidate = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const IsValidPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9@$!%*?&#]{8,14}$";
export const otpDigit="^[0-9]{6}$";
export const onlyAlpha = "^[A-Za-z][A-Za-z ?]*$";
export const onlyAlphaAndOptionalDot = "^[A-Za-z]+\\.?[A-Za-z ?]*$";
export const onlyAlphaWithOptionalDotAndDash = "^[A-Za-z]+\\.?\\-?[A-Za-z?]*$";
export const charactersonly = '^[a-zA-Z \-\']+';  
export const IsValidARN = "^[0-9]{1,6}$";
export const IsValidMobile = "^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$";
export const IsValidPAN = "^[A-Z]{3}[PH]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$";
export const IsValidOTP = "^[0-9]{6}$";
export const IsValidEUIN = "^[0-9]{6}$";
export const IsValidEUINWithCapitalE = "^[E][0-9]{6}$";
export const IsValidPinCode = "^[1-9][0-9]{5}$";
export const IsMICRCode = "^[0-9]{9}$";
export const IFSCCode = "^[A-Z]{4}0[A-Z0-9]{6}$";
export const NumberOnly = "^[0-9]*$";
export const NumberOnlyWithDecimal = "^[0-9]*.[0-9]*$";
export const CharacterOnly = "^[A-Za-z]*$";
export const AlphaNumericOnly = "^[A-Za-z0-9]*$";
export const CharacterANDSpaceOnly = "^[a-zA-Z]{1,}( [a-zA-Z ]{1,})$";
export const CharacterAndOptionalSpace = "^[A-Za-z][A-Za-z ?]*$";
export const IsValidName = "^[a-zA-Z]{1,}( [a-zA-Z. ]{1,})$";
export const IsValidCompanyName = "^[a-zA-Z0-9]{1,}[a-zA-Z0-9@&.()]{1,}([ A-Za-z0-9@.&()]{1,})$";
export const IsValidDate = "^([0-2][0-9]|(3)[0-1])\/(((0)[1-9])|((1)[0-2]))\/([1-9][0-9]{3})$";
export const IsValidDateDash = "^([0-2][0-9]|(3)[0-1])-(((0)[1-9])|((1)[0-2]))-([1-9][0-9]{3})$";
export const IsValidEmail = "^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$";
export const IsValidAddress = "^[A-Za-z0-9\/ ,.-]+$";
export const IsValidAadharNo ="^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$"
export const IsValidUPIID = "^[\w.-]{4,20}@[\w.-]+$";//"^\w.+@\w+$"
export const IsDPID = "^[0-9]{6}$";
export const IsDPIDClientId = "^[0-9]{8}$";
export const IsDPIDCDSL = "^[0-9]{16}$";
export const  numerics="^[0-9]*$";
export const fullname="^[a-zA-Z]{1,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$";
export const emailpattern= "^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$";
export const alphanumeric="^[A-Za-z]*$";
export const validpassword="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,14}$";
export const pannovalidation="^[A-Z]{5}[0-9]{4}[A-Z]{1}";
export const phonenumber=  "^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$";
export const characterwithspacialcharacters = "^[ A-Za-z_@./#&+-]*$";
export const charnumspacedotonly = "^[ A-Za-z\/ ,0-9_.-]*$";

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      ;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
  