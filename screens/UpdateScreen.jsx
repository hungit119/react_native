import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import FormText from '../components/FormText';
import ButtonSubmitForm from '../components/ButtonSubmitForm';

export default function UpdateScreen({route, navigation}) {
  const [data, setdata] = useState();
  const validateSchema = Yup.object({
    maUngVien: Yup.string()
      .min(8, 'Mã ứng viên tối thiểu 8 ký tự')
      .required('Mã ứng viên không được bỏ trống !'),
    tenUngVien: Yup.string()
      .trim()
      .min(25, 'Tên ứng viên ít nhất 25 kí tự')
      .required('Tên ứng viên không được bỏ trống'),
    className: Yup.string().trim().required('Lớp không được bỏ trống'),
    // email: Yup.string()
    //   .trim()
    //   .email('Vui lòng nhập đúng định dạng email')
    //   .required('Email không được bỏ trống'),
    // diaChi: Yup.string().trim().required('Địa chỉ không được bỏ trống'),
    // moTaKinhNghiem: Yup.string().trim().required('Địa chỉ không được bỏ trống'),
  });
  const submitForm = async (values, formikActions) => {
    try {
      const {maUngVien, tenUngVien, className, email, diaChi} = values;
      console.log(values);
      //   await fetch(
      //     `http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/update/${maUngVien}`,
      //     {
      //       method: 'POST',
      //       headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         maUngVien,
      //         tenUngVien,
      //         className,
      //         email,
      //         address,
      //       }),
      //     },
      //   )
      //     .then(response => response.json())
      //     .then(result => {
      //       return navigation.navigate('Home');
      //     });
    } catch (error) {
      console.error('Thêm mới úng viên không thành công', error.message);
    } finally {
      formikActions.setSubmitting(false);
    }
  };
  const handleReset = resetForm => {
    resetForm();
  };
  const fetchData = async () => {
    try {
      await fetch(
        `http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/${route.params.id}`,
      )
        .then(response => response.json())
        .then(result => {
          setdata(result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <View>
        <Text style={{textAlign: 'right'}}>ID ứng viên: {route.params.id}</Text>
      </View>
      {data && (
        <Formik
          initialValues={data}
          validationSchema={validateSchema}
          onSubmit={(values, formikActions) =>
            submitForm(values, formikActions)
          }>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => {
            const {
              maUngVien,
              tenUngVien,
              className,
              email,
              diaChi,
              moTaKinhNghiem,
            } = values;
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
                  value={className || 'jdhjdfkgjdk'}
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
                  value={diaChi}
                  error={touched.diaChi && errors.diaChi}
                  onChangeText={handleChange('diaChi')}
                  onBlur={handleBlur('diaChi')}
                  label="Đỉa chỉ ứng viên"
                  autoCapitalize="none"
                  textarea={true}
                />
                <FormText
                  value={moTaKinhNghiem}
                  error={touched.moTaKinhNghiem && errors.moTaKinhNghiem}
                  onChangeText={handleChange('moTaKinhNghiem')}
                  onBlur={handleBlur('moTaKinhNghiem')}
                  label="Mô tả kinh nghiệm"
                  autoCapitalize="none"
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
      )}
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
