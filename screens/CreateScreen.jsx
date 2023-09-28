import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import FormText from '../components/FormText';
import ButtonSubmitForm from '../components/ButtonSubmitForm';

export default function CreateScreen({navigation}) {
  const defaultValues = {
    maUngVien: '',
    tenUngVien: '',
    className: '',
    email: '',
    address: '',
  };
  const validateSchema = Yup.object({
    maUngVien: Yup.number()
      .min(8, 'Mã ứng viên tối thiểu 8 ký tự')
      .required('Mã ứng viên không được bỏ trống !'),
    tenUngVien: Yup.string()
      .trim()
      .min(25, 'Tên ứng viên ít nhất 25 kí tự')
      .required('Tên ứng viên không được bỏ trống'),
    className: Yup.string().trim().required('Lớp không được bỏ trống'),
    email: Yup.string()
      .trim()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Email không được bỏ trống'),
    address: Yup.string().trim().required('Địa chỉ không được bỏ trống'),
  });
  const submitForm = async (values, formikActions) => {
    try {
      const {maUngVien, tenUngVien, className, email, address} = values;
      await fetch(
        'http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            maUngVien,
            tenUngVien,
            className,
            email,
            address,
          }),
        },
      )
        .then(response => response.json())
        .then(result => {
          return navigation.navigate('Home');
        });
    } catch (error) {
      console.error('Thêm mới úng viên không thành công', error.message);
    } finally {
      formikActions.setSubmitting(false);
    }
  };
  const handleReset = resetForm => {
    resetForm();
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Formik
        initialValues={defaultValues}
        validationSchema={validateSchema}
        onSubmit={(values, formikActions) => submitForm(values, formikActions)}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => {
          const {maUngVien, tenUngVien, className, email, address} = values;
          return (
            <>
              <FormText
                value={maUngVien}
                error={touched.maUngVien && errors.maUngVien}
                onChangeText={handleChange('maUngVien')}
                onBlur={handleBlur('maUngVien')}
                label="Mã ứng viên"
                autoCapitalize="none"
              />
              <FormText
                value={tenUngVien}
                error={touched.tenUngVien && errors.tenUngVien}
                onChangeText={handleChange('tenUngVien')}
                onBlur={handleBlur('tenUngVien')}
                label="Tên ứng viên"
                autoCapitalize="none"
              />
              <FormText
                value={className}
                error={touched.className && errors.className}
                onChangeText={handleChange('className')}
                onBlur={handleBlur('className')}
                label="Tên lớp"
                autoCapitalize="none"
              />
              <FormText
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                autoCapitalize="none"
              />
              <FormText
                value={address}
                error={touched.address && errors.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                label="Đỉa chỉ ứng viên"
                autoCapitalize="none"
                textarea={true}
              />
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  onPress={() => {
                    handleReset.bind(null, resetForm);
                    return navigation.navigate('Home');
                  }}>
                  <Text style={styles.text}>Hủy bỏ</Text>
                </TouchableOpacity>
                <ButtonSubmitForm onPress={handleSubmit} title="Lưu lại" />
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
