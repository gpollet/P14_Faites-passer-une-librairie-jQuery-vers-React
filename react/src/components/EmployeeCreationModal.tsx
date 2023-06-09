import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const EmployeeCreationModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Modal opened={opened} onClose={close} centered>
        <p>Employee Created!</p>
      </Modal>

        <button onClick={open}>Save</button>
    </div>
  );
};

export default EmployeeCreationModal;