import { Box, Button, FormControl, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function TestPage() {
  // diable summit button until file is selected
  const [file, setFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('file', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   if (file !== '') {
  //     formik.setFieldValue('file', file);
  //     alert(JSON.stringify(file, null, 2));
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <h1>Test</h1>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <Input
            onChange={handleFile}
            type="file"
            id="file"
            name="file"
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  );
}
