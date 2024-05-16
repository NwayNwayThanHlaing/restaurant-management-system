import TableCartProvider from "../context/table-cart";

// compoent for admin main layout
export default function AdminMainLayout({ children }) {
  return (
    <TableCartProvider>
      <>{children}</>
    </TableCartProvider>
  );
}
