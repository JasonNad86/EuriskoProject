import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./VerificationScreenStyles";
import { useAuth } from "../../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { VerificationFormData, verificationSchema } from "../../schema/VerificationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const VerificationScreen = () => {
    const [code, setCode] = useState('');
    const {verifyOtp} = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
          verificationCode:""
        },
      });
    
      const onSubmit = (data: VerificationFormData) => {
        verifyOtp(code);
        console.log('Verification Data:', data);
      };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter the 4-digit code</Text>
        
        <Controller
          control={control}
          name="verificationCode"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
            />
          )}
        />
        
        {errors.verificationCode && (
          <Text style={styles.error}>
            {errors.verificationCode.message}
          </Text>
        )}
  
        <Button
          title="Confirm"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
};

export default VerificationScreen;