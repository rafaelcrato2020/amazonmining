const fs = require("fs")
const path = require("path")

// Lista de arquivos conflitantes
const conflictingFiles = [
  "app/api/jobs/route.ts",
  "app/dashboard/page.tsx",
  "app/dashboard/rewards/page.tsx",
  "app/login/page.tsx",
  "app/register/page.tsx",
]

// Função para remover um arquivo se ele existir
function removeFileIfExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath)

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath)
      console.log(`✅ Arquivo removido com sucesso: ${filePath}`)
    } catch (error) {
      console.error(`❌ Erro ao remover arquivo ${filePath}:`, error.message)
    }
  } else {
    console.log(`ℹ️ Arquivo não encontrado: ${filePath}`)
  }
}

// Remover todos os arquivos conflitantes
console.log("🔍 Iniciando remoção de arquivos conflitantes...")
conflictingFiles.forEach(removeFileIfExists)
console.log("✨ Processo concluído!")

// Verificar se ainda existem diretórios app vazios que podem ser removidos
const dirsToCheck = ["app/api/jobs", "app/api", "app/dashboard/rewards", "app/dashboard", "app/login", "app/register"]

dirsToCheck.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir)

  if (fs.existsSync(fullPath)) {
    try {
      const files = fs.readdirSync(fullPath)
      if (files.length === 0) {
        fs.rmdirSync(fullPath)
        console.log(`🗑️ Diretório vazio removido: ${dir}`)
      }
    } catch (error) {
      console.error(`❌ Erro ao verificar/remover diretório ${dir}:`, error.message)
    }
  }
})

console.log('🎉 Limpeza concluída! Agora você pode executar "pnpm run build" novamente.')
