import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, UserPlus, FileText } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100),
  department: z.string().min(1, { message: "Please select a department" }),
  year: z.string().min(1, { message: "Please select a year" }),
  contact: z.string().regex(/^[0-9]{10}$/, { message: "Contact must be a valid 10-digit number" }),
  feeStatus: z.string().min(1, { message: "Please select fee status" }),
  hostelRequired: z.enum(["yes", "no"], { required_error: "Please select hostel requirement" }),
});

type FormData = z.infer<typeof formSchema>;

interface Student extends FormData {
  id: number;
  admissionDate: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Priya Sharma",
    department: "Computer Science",
    year: "1st Year",
    contact: "9876543210",
    feeStatus: "Paid",
    hostelRequired: "yes",
    admissionDate: "2025-01-15",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    department: "Mechanical Engineering",
    year: "2nd Year",
    contact: "9123456789",
    feeStatus: "Pending",
    hostelRequired: "no",
    admissionDate: "2024-08-20",
  },
];

const departments = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Electronics & Communication",
  "Information Technology",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const feeStatuses = ["Paid", "Pending", "Partial"];

const AdmissionForm = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const newStudent: Student = {
      ...data,
      id: students.length + 1,
      admissionDate: new Date().toISOString().split("T")[0],
    };

    setStudents([newStudent, ...students]);
    
    toast({
      title: "Admission Successful! 🎓",
      description: `${data.name} has been admitted to ${data.department}`,
    });

    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Student Admission Portal
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            College ERP Management System
          </p>
        </div>

        {/* Admission Form */}
        <Card className="mb-8 shadow-lg border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">New Student Admission</CardTitle>
            </div>
            <CardDescription>
              Fill in the details to register a new student
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter student name"
                    {...register("name")}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select onValueChange={(value) => setValue("department", value)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-destructive">{errors.department.message}</p>
                  )}
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year *</Label>
                  <Select onValueChange={(value) => setValue("year", value)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && (
                    <p className="text-sm text-destructive">{errors.year.message}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    placeholder="10-digit mobile number"
                    {...register("contact")}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                  {errors.contact && (
                    <p className="text-sm text-destructive">{errors.contact.message}</p>
                  )}
                </div>

                {/* Fee Status */}
                <div className="space-y-2">
                  <Label htmlFor="feeStatus">Fee Status *</Label>
                  <Select onValueChange={(value) => setValue("feeStatus", value)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select fee status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {feeStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.feeStatus && (
                    <p className="text-sm text-destructive">{errors.feeStatus.message}</p>
                  )}
                </div>

                {/* Hostel Required */}
                <div className="space-y-2">
                  <Label>Hostel Required *</Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("hostelRequired", value as "yes" | "no")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="hostel-yes" />
                      <Label htmlFor="hostel-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="hostel-no" />
                      <Label htmlFor="hostel-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.hostelRequired && (
                    <p className="text-sm text-destructive">{errors.hostelRequired.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Submit Admission
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Admitted Students</CardTitle>
            </div>
            <CardDescription>
              Total students: {students.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Year</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Fee Status</TableHead>
                    <TableHead className="font-semibold">Hostel</TableHead>
                    <TableHead className="font-semibold">Admission Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.feeStatus === "Paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : student.feeStatus === "Pending"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {student.feeStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.hostelRequired === "yes" ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>{student.admissionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionForm;
